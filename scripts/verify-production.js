import { spawn } from 'child_process';

async function run() {
  console.log('--- Launching Headless Edge to Verify Production Bundle ---');
  const edge = spawn("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    'http://localhost:4173/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const res = await fetch('http://127.0.0.1:9222/json/list');
    const tabs = await res.json();
    const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('localhost:4173'));

    if (!pageTab) {
      console.error('Failed: No page tab found for localhost:4173');
      edge.kill();
      process.exit(1);
    }

    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    const errors = [];
    const logs = [];

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.exceptionThrown') {
        errors.push(msg.params.exceptionDetails);
      }
      if (msg.method === 'Runtime.consoleAPICalled') {
        logs.push({ type: msg.params.type, text: msg.params.args.map(a => a.value || a.description).join(' ') });
      }
    };

    await new Promise((resolve) => {
      ws.onopen = resolve;
    });

    ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
    ws.send(JSON.stringify({ id: 2, method: 'Network.enable' }));

    // Wait 3 seconds for initial render & WebGL load
    await new Promise(r => setTimeout(r, 3000));

    // Evaluate DOM
    const evalRes = await new Promise((resolve) => {
      const id = 10;
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === id) {
          ws.removeEventListener('message', handler);
          resolve(msg.result?.result?.value);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({
        id,
        method: 'Runtime.evaluate',
        params: {
          expression: `({
            rootLength: document.getElementById('root')?.innerHTML?.length || 0,
            hasCertificates: !!document.getElementById('certificates'),
            hasProjects: !!document.getElementById('projects'),
            hasContact: !!document.getElementById('contact'),
            imagesLoaded: Array.from(document.querySelectorAll('img')).map(img => ({
              src: img.src.replace('http://localhost:4173', ''),
              complete: img.complete
            }))
          })`,
          returnByValue: true
        }
      }));
    });

    console.log('DOM Evaluation Result:', {
      rootLength: evalRes?.rootLength,
      hasCertificates: evalRes?.hasCertificates,
      hasProjects: evalRes?.hasProjects,
      hasContact: evalRes?.hasContact,
      sampleImages: evalRes?.imagesLoaded?.slice(0, 5)
    });

    console.log('Browser Exceptions caught:', errors.length);
    if (errors.length > 0) {
      console.error('Errors:', JSON.stringify(errors, null, 2));
    }

    if (evalRes?.rootLength > 20000 && errors.length === 0) {
      console.log('>>> VERIFICATION PASSED: Production build renders flawlessly with 0 runtime errors!');
    } else {
      console.error('>>> VERIFICATION FAILED: Root length too small or errors encountered');
    }

    ws.close();
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    edge.kill();
  }
}

run();

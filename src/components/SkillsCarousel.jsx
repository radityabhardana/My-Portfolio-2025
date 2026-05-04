import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, SiHtml5, SiCss3, SiFigma, SiGit, SiPhp, SiPython, SiCplusplus, SiBootstrap, SiMongodb, SiVite, SiGithub, SiSolidity, SiEthereum } from 'react-icons/si';
import { useState } from 'react';
import './SkillsCarousel.css';

const skillsData = {
  webDev: [
    { id: 1, name: 'React', icon: SiReact, color: '#61dafb' },
    { id: 2, name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
    { id: 3, name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
    { id: 4, name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
    { id: 5, name: 'HTML5', icon: SiHtml5, color: '#e34c26' },
    { id: 6, name: 'CSS3', icon: SiCss3, color: '#1572b6' },
    { id: 7, name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
    { id: 8, name: 'Bootstrap', icon: SiBootstrap, color: '#7952b3' },
    { id: 9, name: 'PHP', icon: SiPhp, color: '#777bb4' },
    { id: 10, name: 'Python', icon: SiPython, color: '#3776ab' },
    { id: 11, name: 'Vite', icon: SiVite, color: '#646cff' },
    { id: 12, name: 'Git', icon: SiGit, color: '#f1502f' },
  ],
  web3Dev: [
    { id: 13, name: 'Solidity', icon: SiSolidity, color: '#363636' },
    { id: 14, name: 'Ethereum', icon: SiEthereum, color: '#627eea' },
    { id: 15, name: 'Web3.js', icon: SiJavascript, color: '#f7df1e' },
    { id: 16, name: 'Smart Contracts', icon: SiSolidity, color: '#363636' },
    { id: 17, name: 'DeFi', icon: SiEthereum, color: '#627eea' },
    { id: 18, name: 'Blockchain', icon: SiEthereum, color: '#627eea' },
  ]
};

export default function SkillsCarousel() {
  const [activeTab, setActiveTab] = useState('webDev');

  const skills = activeTab === 'webDev' ? skillsData.webDev : skillsData.web3Dev;

  return (
    <div className="skills-container">
      <div className="skills-tabs">
        <button
          className={`skills-tab ${activeTab === 'webDev' ? 'active' : ''}`}
          onClick={() => setActiveTab('webDev')}
        >
          Web Dev
        </button>
        <button
          className={`skills-tab ${activeTab === 'web3Dev' ? 'active' : ''}`}
          onClick={() => setActiveTab('web3Dev')}
        >
          Web 3 Dev
        </button>
      </div>

      <div className="skills-grid-wrap">
        <div className="skills-grid">
          {skills.map((skill) => {
            const IconComponent = skill.icon;
            return (
              <div key={skill.id} className="skill-chip" title={skill.name} aria-label={skill.name}>
                <div className="skill-chip-icon" style={{ borderColor: skill.color }}>
                  <IconComponent className="skill-chip-svg" style={{ color: skill.color }} />
                </div>
                <div className="skill-chip-name">{skill.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

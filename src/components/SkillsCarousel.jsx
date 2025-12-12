import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, SiHtml5, SiCss3, SiFigma, SiGit, SiPhp, SiPython, SiCplusplus, SiBootstrap, SiMongodb, SiVite, SiGithub } from 'react-icons/si';
import './SkillsCarousel.css';

const skills = [
  { id: 1, name: 'React', icon: SiReact, color: '#61dafb' },
  { id: 2, name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
  { id: 4, name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
  { id: 5, name: 'HTML5', icon: SiHtml5, color: '#e34c26' },
  { id: 6, name: 'CSS3', icon: SiCss3, color: '#1572b6' },
  { id: 7, name: 'Figma', icon: SiFigma, color: '#a259ff' },
  { id: 8, name: 'Bootstrap', icon: SiBootstrap, color: '#7952b3' },
  { id: 9, name: 'PHP', icon: SiPhp, color: '#777bb4' },
  { id: 10, name: 'Python', icon: SiPython, color: '#3776ab' },
  { id: 11, name: 'C++', icon: SiCplusplus, color: '#00599c' },
  { id: 12, name: 'Vite', icon: SiVite, color: '#646cff' },
  { id: 13, name: 'Github', icon: SiGithub, color: '#ffffff' },
];

export default function SkillsCarousel() {
  return (
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
  );
}

// script.ts
const toggleSkillsButton = document.getElementById('toggle-skills-btn') as HTMLButtonElement;
const skillsSection = document.getElementById('skills-section') as HTMLElement;

toggleSkillsButton.addEventListener('click', () => {
  if (skillsSection.style.display === 'none' || skillsSection.style.display === '') {
    skillsSection.style.display = 'block';
  } else {
    skillsSection.style.display = 'none';
  }
});

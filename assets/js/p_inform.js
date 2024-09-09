"use strict";
// script.ts
const toggleSkillsButton = document.getElementById('toggle-skills-btn');
const skillsSection = document.getElementById('skills-section');
toggleSkillsButton.addEventListener('click', () => {
    if (skillsSection.style.display === 'none' || skillsSection.style.display === '') {
        skillsSection.style.display = 'block';
    }
    else {
        skillsSection.style.display = 'none';
    }
});

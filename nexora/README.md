# NEXORA

Student learning platform. Plain HTML, CSS and JavaScript with Firebase login.

## Run it
Open the folder with a local web server (the pages use JavaScript modules, which do not work from file://):

    python3 -m http.server 8000

Then visit http://localhost:8000/index.html

In the Firebase console, add `localhost` (and your real domain when you deploy) under Authentication > Settings > Authorized domains.

## Pages
- index.html: home, learning paths, team
- login.html / signup.html: Firebase email and Google login
- dashboard.html: the student's XP, level, streak and progress
- courses.html: every learning path
- aiml, python-home, python, deeplearning, computer-vision, cyber, networking: learning modules

## Shared files
- nexora-core.js: Firebase, per-account progress, streak, progress totals
- nexora-guard.js: login protection and the quick-nav dock on protected pages
- dashboard-live.js: fills the dashboard with real data
- computer-vision-lessons.js: Computer Vision notes, lessons, quiz, practice, challenge

## Adding a module
Add it to MODULES and moduleProgress() in nexora-core.js, then add nexora-guard.js to its page.

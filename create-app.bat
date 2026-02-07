@echo off
cd /d "C:\projects\Hackathon-2-phase-2"
echo n > temp_input.txt  # Answer "No" to React Compiler
echo n >> temp_input.txt # Answer "No" to import alias customization
type temp_input.txt | npx create-next-app@latest frontend --typescript --tailwind --eslint --app --no-src-dir
del temp_input.txt
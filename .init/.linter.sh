#!/bin/bash
cd /home/kavia/workspace/code-generation/note-organizer-182526-182547/notes_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


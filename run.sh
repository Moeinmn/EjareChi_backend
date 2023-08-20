x=$(for f in $(cd ./apps && ls); do echo "${f%/*}"; done | sort -u )
for item in "${x[@]}"; { 
    echo "$item"; 

     npx nest start $item
    
    }

# # Loop through each subdirectory and start the Nest.js app
# for dir in "${SUBDIRECTORIES[@]}"; do
#   cd "$dir"
#   echo "Starting Nest.js app in $dir..."
#   npx nest start
#   cd "$PARENT_DIR"
# done


# Pause to keep the terminal open
read -p "Press any key to exit..."






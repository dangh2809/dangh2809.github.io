# Specify the file path
file_path = 'data.txt'

# Define the content to write
content = '{"text": "Bản mẫu:-vie-", "source": "wiktionary"}\n{"text": "Bản mẫu:-vie-n-", "source": "wiktionary"}'

with open(file_path, 'r') as file:
    # Read the contents of the file
    count = 0
    for line in file:
        if count < 3:
            print(line)
            count = count+1
        else:
            break
# Open the file in write mode
with open(file_path, 'w') as file:
    # Write the content to the file
    file.write(content)

print('Writing to file complete.')
import os 
import json 

folder_path = './public/images'
output_path = "./src/assets/image_paths.json"

def create_folder_structure_json(path): 
	# Initialize the result dictionary with folder 
	# name, type, and an empty list for children 
	result = {'name': os.path.basename(path), 
			'type': 'folder', 'children': []} 

	# Check if the path is a directory 
	if not os.path.isdir(path): 
		return result 

	# Iterate over the entries in the directory 
	for entry in os.listdir(path): 
	# Create the full path for the current entry 
		entry_path = os.path.join(path, entry) 

		# If the entry is a directory, recursively call the function 
		if os.path.isdir(entry_path): 
			result['children'].append(create_folder_structure_json(entry_path)) 
		# If the entry is a file, create a dictionary with name and type 
		else: 
			result['children'].append({'name': entry, 'type': 'file'}) 

	return result

# Call the function to create the JSON representation 
folder_json = create_folder_structure_json(folder_path) 

with open(output_path, "w") as outfile:
    outfile.write(json.dumps(folder_json['children'], indent=4))

print("Written to " + output_path + "!") 

# Modified from GeeksForGeeks
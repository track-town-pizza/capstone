#!/bin/bash

#### SETUP HELPER FUNCTIONS ####

# parse_yaml function written by Stephan Farestam
# REF: http://stackoverflow.com/questions/5014632/how-can-i-parse-a-yaml-file-from-a-linux-shell-script/21189044#21189044
function parse_yaml {
	local prefix=$2
	local s='[[:space:]]*' w='[a-zA-Z0-9_]*' fs=$(echo @|tr @ '\034')
	sed -ne "s|^\($s\):|\1|" \
		-e "s|^\($s\)\($w\)$s:$s[\"']\(.*\)[\"']$s\$|\1$fs\2$fs\3|p" \
		-e "s|^\($s\)\($w\)$s:$s\(.*\)$s\$|\1$fs\2$fs\3|p"  $1 |
	awk -F$fs '{
		indent = length($1)/2;
		vname[indent] = $2;
		for (i in vname) {if (i > indent) {delete vname[i]}}
		if (length($3) > 0) {
			 vn=""; for (i=0; i<indent; i++) {vn=(vn)(vname[i])("_")}
			 printf("%s%s%s=\"%s\"\n", "'$prefix'",vn, $2, $3);
		}
	}'
}

function check_node_version {
	desired_node_version="v12.16.3"
	installed_node_version=$(eval node --version)
	echo Checking if node $desired_node_version is installed...
	if [ $installed_node_version = $desired_node_version ]
	then
		echo Node $desired_node_version is installed.
	else
		echo Node $desired_node_version is not installed or could not be found.
		if [[ $1 == "windows" ]]
		then
			echo You will need to install this manually. Please review the documentation on how to do this.
		else
			echo Will now attempt to install node $desired_node_version ...

			echo Clearing cache...
			eval sudo npm cache clean -f
			echo Installing n \(node version manager\)...
			eval sudo npm install -g n
			echo Upgrading node...
			eval sudo n $desired_node_version
		fi
	fi
}

function check_next_version {
	# No v character included in below variable
	desired_next_version="9.4.0"
	echo Checking if next $desired_next_version is installed...
	installed_next_version=$(eval npm list next | tr -d '\n' | sed 's/.*└── next\@//g')

	if [ $installed_next_version = $desired_next_version ]
	then
		echo next $desired_next_version is installed.
	else
		echo next $desired_next_version is not installed or could not be found.
		if [[ $1 == "windows" ]]
		then
			echo You will need to install this manually. Please review the documentation on how to do this.
		else
			echo Will now attempt to install next $desired_next_version ...
			echo Clearing cache...
			eval sudo npm cache clean -f
			echo Upgrading next...
			eval npm install next@$desired_next_version
		fi
	fi
}


#### SETUP PROCEDURE ####

echo "Running setup..."
echo " "
echo "Reading config.yml"
eval $(parse_yaml config.yml)

# Make sure correct version of node is installed
if [[ $build_check_npm_version == "yes" ]]
then
	check_node_version $build_platform
fi

# Make sure correct version of next is installed
if [[ $build_check_next_version == "yes" ]]
then
	check_next_version $build_platform
fi

# Create production build
if [[ $build_build_for_production == "yes" ]]
then
	echo Attempting production build...
	eval "npm run build"
fi

# Run project
if [[ $build_run_application == "yes" ]]
then
	if [[ $build_option == "dev" ]]
	then
		eval "npm run dev"
	else
		eval "npm run start"
	fi
fi

echo "Setup complete."

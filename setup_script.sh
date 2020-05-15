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

# $1 : platform (unix or windows)
# $2 : mongodb username
# $3 : mongodb password
function setup_environment_variables {
	mongodb_env_var="mongodb+srv://$2:$3@tracktownpizzacluster-lhgnu.mongodb.net/test?retryWrites=true&w=majority"
	if [[ $1 == "windows" ]]
	then
		echo setup environment for windows
		eval [Environment]::SetEnvironmentVariable("URL_ROOT", "http://localhost:3000", "User")
		eval [Environment]::SetEnvironmentVariable("MONGODB_URL", "\"$mongodb_env_var\"", "User")
	else
		eval "export URL_ROOT=http://localhost:3000"
		eval "export MONGODB_URL=\"$mongodb_env_var\""
	fi
	eval printenv
}


# $1 : platform (unix or windows)
# $2 : force reinstall (yes or no)
function install_node {
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
}


# $1 : platform (unix or windows)
# $2 : force reinstall (yes or no)
function install_next {
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
}


function check_node_version {
	desired_node_version="v12.16.3"
	installed_node_version=$(eval node --version)
	echo Checking if node $desired_node_version is installed...
	if [ $installed_node_version = $desired_node_version ]
	then
		echo Node $desired_node_version is installed.
		if [[ $2 == yes ]]
		then
			install_node $1
		fi
	else
		echo Node $desired_node_version is not installed or could not be found.
		install_node $1

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
		if [[ $2 == yes ]]
		then
			install_next $1
		fi
	else
		echo next $desired_next_version is not installed or could not be found.
		install_next $1
	fi
}


#### SETUP PROCEDURE ####

echo "If problems occur with setup check installed npm and next versions."
echo "Running setup..."
echo " "
echo "Reading config.yml"
eval $(parse_yaml config.yml)

echo "Setting environment variables..."
setup_environment_variables $build_platform $credentials_mongoDB_username $credentials_mongoDB_password

# Make sure correct version of node is installed
if [[ $dependencies_check_npm_version == "yes" ]]
then
	check_node_version $build_platform $dependencies_force_npm_reinstall
fi

# Make sure correct version of next is installed
if [[ $dependencies_check_next_version == "yes" ]]
then
	check_next_version $build_platform $dependencies_force_next_reinstall
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

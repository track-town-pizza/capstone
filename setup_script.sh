#!/bin/bash

#### SETUP HELPER FUNCTIONS ####

function check_node_version {
	desired_node_version="v12.16.3"
	installed_node_version=$(eval node --version)
	echo Checking if node $desired_node_version is installed...

	if [ $installed_node_version = $desired_node_version ]
	then
		echo Node $desired_node_version is installed.
	else
		echo Node $desired_node_version is not installed or could not be found.
		echo Will now attempt to install node $desired_node_version ...

		echo Clearing cache...
		eval sudo npm cache clean -f
		echo Installing n \(node version manager\)...
		eval sudo npm install -g n
		echo Upgrading node...
		eval sudo n $desired_node_version
	fi
}

function check_next_version {
	# No v character included in below variable
	desired_next_version="6.1.2"
	echo Checking if next $desired_next_version is installed...
	installed_next_version=$(eval npm list next | tr -d '\n' | sed 's/.*└── next\@//g')

	if [ $installed_next_version = $desired_next_version ]
	then
		echo next $desired_next_version is installed.
	else
		echo next $desired_next_version is not installed or could not be found.
		echo Will now attempt to install next $desired_next_version ...
		echo Clearing cache...
		eval sudo npm cache clean -f
		echo Upgrading next...
		eval npm install next@$desired_next_version
	fi
}


#### SETUP PROCEDURE ####

echo "Running setup..."

# Make sure correct version of node is installed
check_node_version

# Make sure correct version of next is installed
check_next_version

eval npm run dev


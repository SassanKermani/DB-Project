# Ancon

## NPM used
* express
* mongodb
* body-parser

## The gole
build a mongo db that uses one collectin as a schema for the other collection.

# list o shit 
- build a full crUD for about
- build a full cruD for info

# Nameing convention

### db stuff
name Of db 			= 'ancon'
about collection 	= 'about'
info collection 	= 'info'

#### schema's and example objects that will be needed

* info collection
schema is based off of the documents in the about collection

* about collection
{
	name : < string >,
	dataType : < string >
}

* update req.body
{
	id : < id >
	newDoc : {
		< thing > : < thing >,
		.
		.
		.
	}
}

# boroken things
- in the creatAbout you have to make sure the req.body.dataType is = to a valad dattatype string, int, double, ... 

# ideas

# Ancon

## NPM used
* express
* mongodb
* body-parser

## The gole
build a mongo db that uses one collectin as a schema for the other collection.

# list o shit 
- build a full crUD for about
- build a full crUD for info

# Nameing convention

### db stuff
name Of db 			= 'ancon'
about collection 	= 'about'
info collection 	= 'info'

#### schema's

* info collection
schema is based off of the documents in the about collection

* about collection
{
	name : String,
	dataType : String
}

# boroken things
- in the creatAbout you have to make sure the req.body.dataType is = to a valad dattatype string, int, double, ... 
- in the createInfo you have to make suer the req.body.< anyghing > is = to the same type from the schema

# ideas

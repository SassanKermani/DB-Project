# Ancon

## NPM used
* express
* mongodb
* body-parser

## The gole
build a mongo db that uses one collectin as a schema for the other collection.

# list o shit 
- set up so user needs an api key to get in

- build a full crud for about

- build a full crud for info

- make a genral purpus query for the about collection

- make a genral purpus query for the info collection

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

* udate about doc req.body
{
	id: < id >
	newDoc : {
		name : < string >,
		dataType : < string >
	}
}

* update info doc req.body
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

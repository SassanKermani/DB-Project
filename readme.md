# Ancon

## NPM used
* express
* mongodb
* body-parser

## The gole
build a mongo db that uses one collectin as a schema for the other collection.

# list o shit 


- set up so user needs an api key to get in
- (DONE)build a full crud for about
- (DONE)build a full crud for info
- (DONE)make a genral purpus query for the about collection
- (DONE)make a genral purpus query for the info collection

- fix nameing convention with req.body 
- done	 creat			creat
- done	 read			read
- done	 update		 	update
- done	 delete		 	delete
- 		 query			query

- change about to config && config to < routFile >

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

* req.body
{
	doc : {
		//this is where a new or updated doc will be
	},
	query{
		//this is wehre a query will be for seaching a doc
	},
	id : <  >,
	table : <  > //collection
}

# boroken things
- in the creatAbout you have to make sure the req.body.dataType is = to a valad dattatype string, int, double, ... 

# ideas

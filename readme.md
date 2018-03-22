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
- done	 creat	|	done	creat
- done	 read	|	done	read
- done	 update	|	done	update
- done	 delete	|	done	delete
- done	 query	|	doen	query

- (DONE)find out how creat a rout for the user to see all the tables that are in the db

- ok so I need to set up a way of telling what is conected to what and by what.
basicly a way to track public and forin keys, somtihig that will self update...
this is going to be hard and cick myass repedtudly. 
	
I think the way im going to solve this with a config collection and a config_config collection 
config is set up by the infoDocs->infoDocs and config_config will be set up by the configDocs->infoDocs 
	-(DONE)get all config tables schemas
	-get get a list of every table, and what other tables it can join with and on what colloms

- change about to config && config to < routFile >

- (DONE)clean up code with functons for the promis also for valadiating req.body


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
	id : <  >, //id of the thing you want to mess with
	table : <  > //collection
}

# boroken things
- in the creatConfig you have to make sure the req.body.dataType is = to a valad dattatype string, int, double, ... (not actuly as bit of a problam as I Thought)
 

# ideas
config_ table to hold relationships
config_config table to also hold relationships




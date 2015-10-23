# Music Web, Final Project for the Semantic Web course

Music Web connects you to composers of different era. It is designed for users to gain a deeper understanding of the composers and music that have been with us since growing up. Classical Music, modern composers etc. 

Being built on Semantic Web Technologies, it strives to keep users updated with popular articles off Wikipedia and interactive audio from YouTube.


A video of the working application is shown here - <https://www.youtube.com/watch?v=0CZT23sFdiM>


### Requirements

To get this thing up and running on a local machine, you need the following:

* npm install
* bower install
* A recent Stardog installation (with license located in MusicWeb root folder)
  * MusicWeb folder in the directory is a Stardog database file. In the case the database is not seen on <http://localhost:5820/MusicWeb>, please perform the database setup with the steps below.
	  
<Stardog Config>
  * visit Stardog running at <http://localhost:5820>
  * create a new database and name it "MusicWeb", set "Reasoning Type" to 'SL', "SameAs Reasoning" to 'FULL'.
  * upload 'MusicWeb.ttl' from the Ontology folder
  * If you want to use a different name or location (i.e. not running on localhost, port 5820) you need to change this within index.js.

Once everything is ready:

<In Terminal or Command Prompt>
* start Express Node.js server with `gulp`,
* start your Stardog server with `stardog-admin server start`


###Runtime
The web app is then running at <http://localhost:5000>, Stardog running at <http://localhost:5820> .


Kudos to Rinke Hoekstra for his assistance along the way.

Design and Concept by Adam Chee

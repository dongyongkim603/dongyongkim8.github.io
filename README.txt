This is a prototype of my digital portfolio in website form. It utilizes several basic 
front-end tools and techniques such as Bootstrap, css, JavaScript, DOM Oject manipulation,
and animations.

The page format uses cards to organize the content. These cards are stylized with backgound
gradients or images and within the some of the cards themselves are grid patterns to keep
sub cards organized. Each page will have a top navigation bar (search function not yet functional)
and a sticky header that will serve as a contact and links card.

"Home" serves as a landing page and a temporary about section where I list my skills, qualifations,
and anchor some projects to view.

The "About" page is unfinished but will serve to list other non-work related content about 
myself.

"Location" utilizes the Google Map API to show a place of interest and add in additional
keys to the map to help the user navigate. The API is currently non-working as I removed the
key to prevent overuse while not running live.

//------------------- Front-end -----------------------------

"Contact" is currently just the front end view of a form that will be used to inqure about
jobs or other communication with myself.

"Calculator" a simple calculator application. The views are built with HTML divs stylized by the
local "main.css" file. The logic is handled by a JavaScript file that creates event listeners
on all the divs and gathers that information when clicked. The proper operations are performed and
the result is output to the divs on top. 

This page along with all the other project pages come with a more info button on the bottom
which makes use of the animation I created in "main.css". This animation will spin the hamburger
button and show a full screen information page infront of the current page. The hamburger itself
will turn into an "X" and when clicked again will clear the page of the information.

The "dictionary" page is the most complex front end project listed. This page has a card that has a link
to download the .txt dictionary which is then uploaded via the choose file button. When the file is uploaded
the "dictionary.js" will call in the filter file function that will parse the file and remove any line of data
that are not needed. This creates a String array. On the dictionary.html page there is a text area that the user
enters a word to search. When the user clicks submit the script will be called to search for the word in the 
text area. The data will then be output to the user via a div and DOM object manipulation. For further detail on
this project check out: https://github.com/dongyongkim603/Phonetic-Dictionary

The "Message" page showcases the instant messaging application. This project is a simple front-end only messaging
system the uses JavaScript DOMObject manipulation to take text from one messenger and send it to the other.

//------------------- User Account -----------------------------

The "login" page is a simple card that asks the user for a username and password to login.
it also provides an area for the user to be redirected if the user has forgotten thier 
password.

"Register" uses a similar layout to the login page but with the addition of extra fields:
First name, Last name, Email address, phone number. Birthday, Repeat password, and an accept
terms checkbox. The registration page makes use of the "registration.js" script file to validate the data
before it is sent in. This is done with the use of regular expression and the require attributes.
trello-utils
============

Utility tools for working with Trello

# Overview

I am writing this project for several reasons.  The primary reason
is to focus my experimentation with some of the new-ish JavaScript
frameworks like Backbone and tools like grunt.  It also gives me
an excuse to write some utility tools for Trello I've been wanting
to write for a little while now.

## Trello API and SPA experimentation

Currently the project just authorizes a user and fetches the boards
and cards for a configured orginization within Trello.  

The focus has been to get the project stack and organization
established. Nothing more.  

At this point this is working so I've put it on github.


## Coming Soon: Prioritize a set of cards

The projects I work on have cards in multiple boards.  I want a way
to setup a master prioritization of the cards that matter to the
client, team, my boss or whomever.

The idea is to query all cards within an organization and present
them as a single list.  A user will then drag stories to a
prioritization list and order them from most important to least
important.

The order can be persisted a number of ways: local storage, external
database or possibly within a card in a Trello board.  First
implementation will try to use Trello to store the data.

## Coming Soon: Consolidate cards

I often find myself consolidating multiple Trello cards into a single
card. Trello does not have a good mechanisim built in so I'm going
to have to roll my own.

Currently I have to create lists manually, copying titles and short
URL's so I can get back to the original or get to the consolidated
card when viewing an original.  Bit of a pain but handy once
completed.  Really cuts down on the volume of related defect cards
during testing, when developing stories, etc

Naturally, once I get it working Trello will gain that feature! Guess
I better get cracking on it!

The idea is to allow a user to select a group of cards and push a
button to kick off the steps I perform manually when I consolidate
cards together:

  * Create a new card
  * Copy card title from each source card to a checklist in the 
    new card
  * Copy card description from each source card to the new card's
    description, as a comment, etc.
  * Include the short URL for each source card in its checklist item
    in the new card to facility back linking.
  * Enter a note into the beginning of the description of each source
    card to indiciate it has been consolidated including the short
    URL of the new card to facilitate forward linking.
  * Archive the source cards when consolidation completes.

# vue-auth-sample-2

## Project Description

This is a Vue example of handling a Vue App with pages locked behind a common Login component.
The router-view is only accessed after a successful Login, and it utilizes the local storage to save a jwt of your authentication to restore the state after a refresh.

The main branch uses Local Storage as the mean to store the session token, while the js-cookies branch uses cookies to store the session token.

Another example of authentication handling involves a router direction to a specified Login page is on /vue-auth-sample.

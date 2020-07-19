Basic flash card app that allows you to add new 'decks' of cards and questions to each deck. Then you can take a quiz with the questions.

To start

-> run NPM install 

-> !important - After npm install has been run, go to expo's own node_modules, remove the react-native-safe-area-context from there. Otherwise you will get an "Invariant violation: Tried to register two views with the same name RNCSafeAreaProvider" error. I ran into this error when building the project and this is the solution according to this git issue: https://github.com/th3rdwave/react-native-safe-area-context/issues/110

-> run yarn ios (I've only tested this on ios.)

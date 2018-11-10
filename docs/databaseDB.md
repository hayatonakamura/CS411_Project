## Database
Choice of DB - *mongoDB*

- Flexible Data structure
- Simple CRUD operations

For the sequence diagram, please view mood_fixer_sequence1.png.


## mongoDB Schema
```
    var ProductLabel = mongoose.model('LabelObject',{
        name: String, 
        mood: String, 
    });
```

## Example Model
The general structure for this mongoDB model is the following:

-user

......-Day

.........-Moods
       

Example:

John Snow

......10-25-2018

..........- Angry

..........- Sad

..........- Happy

..........- Happy

..........- Happy

..........- Happy

......10-26-2018

..........- Happy

..........- Happy

..........- Angry

..........- Angry

..........- Sad

..........- Sad

..........- Confused

## Cache Implementation
The implementation for the cache is done by storing the following information:

## Cache Schema

```
    var ProductLabel = mongoose.model('LabelObject',{
        name: String, 
        mood: String, 
    });
```

This is necessary for the application in order to understand their current streak of moods. Certain flags must be set when a specific emotion is seen consistently and through caching, the process will be controlled faster. The cache also uses mongoDB but may additionally use local storage as well.


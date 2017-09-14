# syncano-socket-rest-framework
Syncano socket for easy peasy rest framework
## Installation
`$ s add rest-framework` 
## Configuration
`$ s call rest-framework/configure`

Example parameters of configuration
```
{
  models: ["book","author","post"],
  logged_in: [
    {
      model: "book",
      type: "c"
    },
    {
      model: "author",
      type: "c"
    }
  ],
  object_level: [
    {
      model: "post",
      type: "ud",
      owner_field:"user"
    },
    {
      model: "author",
      type: "ud",
      owner_field:"user"
    },
    {
      model: "book",
      type: "ud",
      owner_field:"user"
    }
  ]
}
```
So book, credentials, author, page models will be available in rest framework.

Post creation is allowed for everybody.

Creation of books and authors is limited to logged in users.

Updating and deleting authors and books is only allowed for those who created these models.

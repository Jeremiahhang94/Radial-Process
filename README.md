RADIAL PROGRESS - READ ME v1.0


RADIAL PROGRESS - VERSION 1.0
AUTHOR: JEREMIAH ANG YONG EN
DATE: 18 DECEMBER 2014

=======================================================

About

This is a simple radial progress animation, which allows you to use it as:
1. countdown timer
2. countdown value
3. clock. 

=======================================================

How to Create a Circle

1. create a div with a given Id 

      <div id = ‘radial_example’></div>

2. in your script create a new RadialProgress object with the Div’s Id as the first parameter.

      <script>
            var rp = new RadialProgress(‘radial_example’);
      </script>

3. Extended Parameters:

   a. color (String)
   
         This define the base color of the circle.

   b. highlight (String)
   
         This defines the progress bar’s color

   c. duration (int)
   
         Time taken to complete a whole cycle, given in milliseconds (1 sec = 1000 milliseconds)

   d. length (int)
   
         This define the diameter of the circle

   e. auto (boolean)
   
         This defines if the animation would start automatically upon loading

   f. complete( ) (function)
   
         This function will be performed once the progress have completed

4. Example
     ```javascript
      var c = new RadialProgress(“example_ID”, {
            color: “#FF2233”,
            highlight: “#2255AA”,
            duration: 2000,
            auto: true,
            complete: function(){
                  alert(“Complete!”);
            }
      });
      ```
5. Methods

   a. animate( )

         Starts the animation

   b. stop( )

         Stops the animation

   c. setPercent( float percent )

         Set the percent of the animation

      

 

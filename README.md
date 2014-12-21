RADIAL PROGRESS - READ ME v1.1


RADIAL PROGRESS - VERSION 1.3

AUTHOR: JEREMIAH ANG YONG EN 

DATE: 18 DECEMBER 2014

=======================================================

About

This is a simple radial progress animation, which allows you to use it as:

   1. countdown timer
   2. countdown value
   3. clock. 

=======================================================

VERSION

1.1 Changes in class names
1.2 Reset capabilities
1.3 added text in middle of circle

=======================================================

How to Create a Circle

1. Create a div with a given Id 

      <div id = ‘radial_example’></div>

2. In your script create a new RadialProgress object with the Div’s Id as the first parameter.

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

   g. text_options (object)
   
         This defines the styles of the text in the circle, read more in 4. Extended Parameters - Text styles

4. Extended Parameters - Text styles:

   a. text_show (boolean)
   
         This defines whether or not there should be text in the circle
   
   b. value_text (Number or String)
   
         Starting text for value
   
   c. unit_text (Number or String)
   
         Starting text for measurement Unit

   d. value_color (String)
   
         This defines the Color of the value text
   
   e. unit_color (String)
   
         This defines the Color of the unit text
   
   f. value_size (int)
   
         This defines the font size of the value text
   
   g. unit_size (int)
   
         This defines the font size of the unit text
   
   h. value_y_pos (int)
   
         This defines the y-position(margin-top) of the value text relative to the top of the circle
   
   i. unit_y_pos (int)
   
         This defines the y-position(margin-top) of the unit text relative to the top of the circle
   
   j. font_family (String)
   
         This defines the font-family for both text

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

   d. setTextValue( String text_value )
   
         Set the Text for value

   e. setTextUnit ( String text_unit )
   
          Set the Text for unit
  
   f. restart( )
   
         Restarts the circle, auto start again if option states auto

   g. setOnclick( function onclick )
   
         Set the onclick function

 

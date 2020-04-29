const song = {
    name: 'Dying to live',
    artist: 'Tupac',
    featuring: 'Biggie Smalls'
   };

   const markup=`
   <div class="song">
   <p>
   ${song.name}__${song.artist}
   (Featuring ${song.featuring})
   </p>
   </div>
   `
   export{
       markup
   };
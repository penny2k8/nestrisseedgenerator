# NES Tetris Seed Generator
### Why?
Because the `!seed` command on ClassicTetrisBot is restricted to only mods and admins. Using [RANDOM.org](https://www.random.org/) is also fine but it has too many excess functions. I built something specialized for NES Tetris Seed, only.
### Usage
Just press the button on the site, you should be good to go.
### How does the generator works?
It generates a specific decimal number then convert it into hexadecimal, that's it
### Explaining the code
If you know coding, you can safely skip this and go to the end of this document, yay. <br>
If you don't, here's a detailed explanation.
<br>
<br>
I coded this with `rng-js` and `bootstrap` (credits will be at the end) <br>
#### Seeding the RNG
``` javascript
const d = new Date();
var rng = new RNG('6,492,500'+d.getTime())
```
Basically this set the seed of the RNG to the sum of the current NES Tetris score record set by EricICX and the amount of seconds since 1970.
#### Generating Seed
``` javascript
function gimme()
{
    var lattedeletta = rng.random(512, 16777215); // 512 = 000200 | 16777215 = FFFFFF
    var seed = lattedeletta.toString(16); // Convert to Hex
    seed = String(seed).padStart(6, "0"); // Add zeros at the start
    document.getElementById("seed").innerHTML=seed.toUpperCase(); // Return seed
}  
```
(Please do not mind the name of the variable, I know it's weird) <br>           
Anyways, the process is pretty straightforward. <br>
First, a random number from `512` to `16 777 215` will be generated, then it will be converted to hexadecimal, add "0" to fully reach 6 hex digits (if needed), capitalized and returned, that's pretty much it.
#### Why `512` to `16 777 215`?
This is decided by Tetris Gym and HydrantDude's Fixed RNG Patch themselves. <br>
Tetris Gym requires seed value higher than 0000FFF. Meanwhile, Hydrant's patch does not have a specific seed value floor, but rather have "bad seeds", some of which has `0000` or `0001` as their first two (out of 3) bytes. <br>
As a result, I just started the RNG from 000200 (512) to FFFFFF (16777215). <br>
**Note:** Not all "bad seeds" have been removed. There are still seeds considered "bad" which ends in `01`, `02`, or `03`. <br>
Here's some math:<br>
Total number of seeds: `16 777 216` <br>
Total number of "bad seeds" starting with `0000` or `0001`: `512` <br>
Total number of "bad seeds" starting with `0000` or `0001`and ending with `01`, `02` or `03`: `6` <br>
Total number of "bad seeds" ending with `01`, `02`, or `03`: `196 608` <br>
=> Total number of "bad seeds" left: `196 602`<br>
=> Total number of "good seeds" left: `16 580 102` <br>
There are still a great deal of "bad seeds" left, but with only about `1.172%` of the RNG rolling out a bad seed, this should not be a big deal<br>
For comparision, without the removal, the chance for a bad seed to appear is `1.175%`
### Future improvements
Generate seed byte-by-byte, in order to eliminate all bad seeds, or reintroduce all bad seeds back, if I think that's fine.
### Stuff used in the code.
- [rng-js](https://github.com/skeeto/rng-js/tree/master) by [skeeto](https://github.com/skeeto)
- [bootstrap](https://getbootstrap.com/)

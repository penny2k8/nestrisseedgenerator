const d = new Date();
var rng = new RNG('6,492,500'+d.getTime()) //Seed the RNG
function gimme()
{
    var lattedeletta = rng.random(256, 16777215); // 256 = 000100 | 16777215 = FFFFFF
    var seed = lattedeletta.toString(16); // Convert to Hex
    seed = String(seed).padStart(6, "0"); // Add zeros at the start
    document.getElementById("seed").innerHTML=seed.toUpperCase(); // Return seed
}
//사랑해
//love you, miss you, mean it
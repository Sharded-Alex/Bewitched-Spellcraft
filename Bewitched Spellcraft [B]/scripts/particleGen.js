import {world, system, ItemStack, EntityHealthComponent, BlockVolume, BlockVolumeBase, BlockPermutation, MolangVariableMap} from "@minecraft/server";
import {Vector3} from "./VectorMath/index.js";

export const baseParticles = {
  // The emitter type
  "particleType": "point",
  // The type of particles that are spawned. [smoke is default]
  "particle": "smoke_particle",
  // The direction the particles will slowly drift in.
  "acceleration": Vector3.zero(),
  // The direction the particles are intentionally going in.
  "direction": Vector3.zero(),
  // The speed at which the particles will spread out. Setting it to 0 indicates no outward burst.
  "speed": 0,
  // How long the particle continuosly runs for.
  "runtime": 1,
  // How much particles are spawned every tick. MAX is 100.
  "particle_density": 5,
  // How fast each particle will rotate. Setting it to 0 ensures no rotation.
  "rotation": 0,
  // How large the shape is. Valid on Spheres and Discs
  "radius": 1,
  // How big or small an individual particle is.
  "size": 0.1,
  // How long this particle will survive
  "lifeTime": 1.4,
  // Decides the color of a particle
  "color": {
    "red": 0,
    "green": 0,
    "blue": 0,
    "alpha": 1
  }
};

export function triggerCustomParticle(location, dimension, particleStuff) {
  let particle = particleStuff;
  let molang = undefined;
  molang = new MolangVariableMap();
  molang.setVector3("variable.acc", particle.acceleration);
  molang.setFloat("variable.spd", particle.speed);
  molang.setFloat("variable.active_time", particle.runtime);
  molang.setFloat("variable.spawn_amount", particle.particle_density);
  molang.setFloat("variable.rotation", particle.rotation);
  molang.setFloat("variable.life", particle.lifeTime);
  molang.setFloat("variable.particle_size", particle.size);
  molang.setColorRGB('variable.color', {red: particle.color.red, green: particle.color.green, blue: particle.color.blue, alpha: 1});
  
  if (particle.particleType == "circle" || particle.particleType == "disc") {
    molang.setFloat("variable.radius", particle.radius);
  }
  
  dimension.spawnParticle(`bs:${particle.particleType}_${particle.particle}`, location, molang);
}
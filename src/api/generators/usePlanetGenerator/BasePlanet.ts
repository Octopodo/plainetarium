import type { Layer } from "@/types";

abstract class BasePlanetGenerator {
layers: Layer[];
  constructor() {
    this.layers = []
  }

  generate() {
    return this.planet;
  }
}
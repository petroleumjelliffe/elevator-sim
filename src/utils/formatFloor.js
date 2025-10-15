/**
 * Converts a floor number to its ordinal representation
 * @param {number} num - Floor number (0, 1, 2, 3, etc.)
 * @returns {string} - Ordinal string (Lobby, 1st, 2nd, 3rd, etc.)
 */
export function getOrdinal(num) {
  if (num === 0) return "Lobby";
  const suffixes = ["th", "st", "nd", "rd"];
  const v = num % 100;
  return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

/**
 * Extends Number prototype to add toOrdinal method
 * Call this once in your app initialization
 */
export function extendNumberPrototype(penthouseFloor) {
  if (!Number.prototype.toOrdinal) {
    Number.prototype.toOrdinal = function() {
      return getOrdinal(this.valueOf());
    };
  }
  if (!Number.prototype.toInitial) {
    Number.prototype.toInitial = function() {
      if (this.valueOf() === 0) return "L";
      if (this.valueOf() === penthouseFloor) return "PH";
      return this.valueOf()
    }
  }

}

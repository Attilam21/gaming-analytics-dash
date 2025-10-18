/**
 * @typedef {('coach'|'player')} Role
 * 
 * @typedef {Object} Skill
 * @property {string} name
 * @property {number} value
 * 
 * @typedef {Object} Player
 * @property {string} id
 * @property {string} name
 * @property {number} number
 * @property {string} position
 * @property {Skill[]} skills
 * @property {[string,string,string]=} images
 * 
 * @typedef {Object} Match
 * @property {string} id
 * @property {string} date
 * @property {string} opponent
 * @property {number} goalsFor
 * @property {number} goalsAgainst
 * @property {Object<string, any>=} stats
 * 
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'open'|'done'} status
 */
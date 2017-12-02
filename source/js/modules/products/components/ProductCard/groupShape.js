import PropTypes from 'prop-types';
import modifierShape from './modifierShape'
const {shape, string, arrayOf, bool} = PropTypes;
import MODIFIER_GROUP_TYPE from '../../enums/modifierGroupType'

export default shape({
	name: string,
	code: string,
	inventCode: string,
	modifierGroupType: PropTypes.oneOf([MODIFIER_GROUP_TYPE.REQUIRED, MODIFIER_GROUP_TYPE.OPTIONAL]),
	modifiers: arrayOf(modifierShape)
})

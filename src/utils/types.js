import PropTypes from 'prop-types';

export const ITEM_SHAPE_TYPES = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
});

export const NAV_SHAPE_TYPES = PropTypes.shape({
    title: PropTypes.string.isRequired, 
    logo: PropTypes.string.isRequired, 
    type: PropTypes.string.isRequired, 
    view: PropTypes.bool.isRequired 
});
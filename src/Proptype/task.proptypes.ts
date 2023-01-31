import PropTypes from 'prop-types';

export const TaskType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    finished: PropTypes.bool.isRequired,
})
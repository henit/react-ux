import _ from 'lodash/fp';
import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';

const block = bemCn('item');

export default function Item({ className, title, text, image, avatar, small, large, xlarge, onClick, loading }) {
    if (loading) {
        // Show in loading state
        return (
            <div className={ block.mix(className)({ small, large, xlarge, loading })() }>
                <div className={ block('media')() }>
                    <div className={ block('avatar')() } />
                </div>
                <div className={ block('content', { lines: 2 })() }>
                    <div className={ block('title')() } />
                    <div className={ block('text')() } />
                </div>
            </div>
        );
    }

    const lines = (title ? 1 : 0) + (text ? _.castArray(text).length : 0);
    const nomedia = !(image || avatar);
    const Tag = onClick ? 'a' : 'div';

    return (
        <Tag className={ block.mix(className)({ small, large, xlarge, nomedia })() } onClick={ onClick }>
            { (image || avatar) &&
                <div className={ block('media')() }>
                    { image &&
                        <div className={ block('image')() } style={{ backgroundImage: `url(${image})` }} />
                    }
                    { avatar &&
                        <div
                            className={ block('avatar')() }
                            style={{ backgroundImage: `url(${avatar})` }} />
                    }
                </div>
            }
            <div className={ block('content', { lines })() }>
                { title &&
                    <span className={ block('title')() }>{ title }</span>
                }
                { text &&
                    <span className={ block('text')() }>
                        { _.castArray(text).map((textLine, i) =>
                            <span key={ `text${i}` } className={ block('textline')() }>{ textLine }</span>
                        ) }
                    </span>
                }
            </div>
        </Tag>
    );
}

Item.propTypes = {
    className: PropTypes.string,
    title: PropTypes.node,
    text: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    image: PropTypes.string, // Url
    avatar: PropTypes.string, // Url
    small: PropTypes.bool,
    large: PropTypes.bool,
    xlarge: PropTypes.bool,
    onClick: PropTypes.func,
    loading: PropTypes.bool
};

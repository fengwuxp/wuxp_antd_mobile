import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';


const DEFAULT_ICON_SIZE = 12;


export interface IconProps {

    name: string;

    family?: string;

    size?: number;

    color?: string;

    children?: React.ReactNode;

    style?: React.CSSProperties
}

export interface GlyphMap {
    [key: string]: number
}

/**
 * @param glyphMap
 * @param fontFamily
 * @return {Icon}
 */
export default function createIconSet(glyphMap: GlyphMap, fontFamily: string) {

    let fontReference = fontFamily;

    const IconNamePropType = PropTypes.oneOf(Object.keys(glyphMap));

    class Icon extends PureComponent<IconProps, any> {

        static propTypes = {
            name: IconNamePropType,
            size: PropTypes.number,
            color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            children: PropTypes.node,
            style: PropTypes.any, // eslint-disable-line react/forbid-prop-types
        };

        static defaultProps = {
            size: DEFAULT_ICON_SIZE,
            allowFontScaling: false,
        };

        render() {
            const {name, size, color} = this.props;

            let glyph = name ? glyphMap[name] || '?' : '';
            if (typeof glyph === 'number') {
                glyph = String.fromCharCode(glyph);
            }
            const styleOverrides: React.CSSProperties = {
                fontFamily: fontReference,
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontSize: size,
                color,
            };

            return (
                <i style={styleOverrides}>
                    {glyph}
                    {this.props.children}
                </i>
            );
        }
    }


    return Icon;
}

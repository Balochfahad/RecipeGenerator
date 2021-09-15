import React from "react";
import { Image, View, prototypes } from "react-native";
import PropTypes from 'prop-types';
import Text from "../Text";

import { NO_INTERNET_TITLE, NO_INTERNET_DESCRIPTION } from "../../constants"

// styles import
import styles from "./styles";

const Error = ({ image, title, description, titleStyle, descriptionStyle }) => {
    return (
        <View style={styles.container}>
            {image && <Image renderMode={"contain"} source={image} />}
            <Text type={'xLarge'} style={titleStyle}>{title}</Text>
            <Text style={descriptionStyle}>{description}</Text>
        </View >
    );
}

Error.propTypes = {
    image: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    titleStyle: PropTypes.object,
    descriptionStyle: PropTypes.object,
}

Error.defaultProps = {
    image: null,
    title: NO_INTERNET_TITLE,
    descriptionStyle: {},
    titleStyle: {},
    description: NO_INTERNET_DESCRIPTION
}
export default Error;

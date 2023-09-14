import React from "react";
import PropTypes from "prop-types";
import './videoStyle.css';

const YoutubeEmbed = (props) => {
    console.log('video id props  ', );
    
 const embedUrl=`https://www.youtube.com/embed/${props.videoId}`;
 console.log('EMBED URL ', embedUrl );
 


    return (
  

  <div className="video-responsive">
    <iframe
      width="500"
      height="300"
      src={embedUrl}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
)};

YoutubeEmbed.propTypes = {
 videoId: PropTypes.string.isRequired
};

export default YoutubeEmbed;
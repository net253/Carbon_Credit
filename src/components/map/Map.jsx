import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import Layout from "../image/Layout3.png";
import WaterBank from "../image/waterBank.jpg";
import Park from "../image/Park.jpg";
import "./Map.css";
import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaWlvdC1jZW50ZXIiLCJhIjoiY2wzdGxyZGs3MjNhcjNkbTlqamltazI4diJ9.WHi56LyL6oB75Fh81Pbz6g";

const buttonOption = [
  {
    text: "Overview",
    value: "overview",
  },
  {
    text: "Zone A",
    value: "zoneA",
  },
  {
    text: "Zone B",
    value: "zoneB",
  },
  {
    text: "Zone C",
    value: "zoneC",
  },
  {
    text: "Zone D",
    value: "zoneD",
  },
  {
    text: "SNC Park",
    value: "park",
  },
  {
    text: "ธนาคารน้ำ",
    value: "waterBank",
  },
];

const zone = {
  overview: {
    center: [101.089838, 12.88696],
    zoom: 15.6,
    bearing: 30,
  },
  zoneA: {
    center: [101.094722, 12.885376],
    zoom: 17,
    bearing: 30,
  },
  zoneB: {
    center: [101.090543, 12.887918],
    zoom: 17.2,
    bearing: 30,
  },
  zoneC: {
    center: [101.090578, 12.88499],
    zoom: 16.6,
    bearing: 30,
  },
  zoneD: {
    center: [101.086348, 12.890214],
    zoom: 17.1,
    bearing: 30,
  },
  park: {
    center: [101.095861, 12.883794],
    zoom: 18.9,
    bearing: 32,
  },
  waterBank: {
    center: [101.093994, 12.866949],
    zoom: 18,
    bearing: -63,
  },
};

const nameZone = [
  "overview",
  "zoneA",
  "zoneB",
  "zoneC",
  "zoneD",
  "park",
  "waterBank",
];

export default function Map({ mapInfo, selectInfo }) {
  const navigate = useNavigate();
  const mapContainer = useRef(null);
  const popupRef = useRef();
  const [hover, setHover] = useState(false);
  const [coLngLat, setCoLngLat] = useState({
    lng: "",
    lat: "",
  });
  const [geojson, setGeojson] = useState({
    type: "FeatureCollection",
    features: [],
  });

  const handleData = () => {
    let dataAll = mapInfo;
    if (selectInfo != "") {
      dataAll = mapInfo.filter(
        (value) => value.properties.description == selectInfo
      );
    }
    const data = {
      type: "FeatureCollection",
      features: dataAll,
    };

    setGeojson(data);
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      // style: "mapbox://styles/mapbox/light-v10",
      center: [101.089838, 12.88696],
      bearing: 30,
      // pitch: 60,
      zoom: 15.6,
      maxZoom: 20,
      minZoom: 12,
    });

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    map.on("load", function () {
      map.addSource("Layout", {
        type: "image",
        url: "./assets/Layout3.368345cb.png",
        // url: Layout,
        coordinates: [
          [101.08481, 12.89354],
          [101.09864, 12.88582],
          [101.0955, 12.880332],
          [101.08158, 12.88793],
        ],
      });
      map.addLayer({
        id: "layout",
        source: "Layout",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
        layout: {
          visibility: "visible",
        },
      });

      map.addSource("Park", {
        type: "image",
        url: "./assets/Park.08f83e78.jpg",
        // url: Park,
        coordinates: [
          [101.095484, 12.884434],
          [101.096316, 12.883894],
          [101.095904, 12.883262],
          [101.095069, 12.883824],
        ],
      });
      map.addLayer({
        id: "park",
        source: "Park",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
        layout: {
          visibility: "none",
        },
      });

      map.addSource("WaterBank", {
        type: "image",
        url: "./assets/waterBank.01fc20e5.jpg",
        // url: WaterBank,
        coordinates: [
          [101.092742, 12.8662],
          [101.093938, 12.868374],
          [101.09519, 12.867702],
          [101.094053, 12.865505],
        ],
      });
      map.addLayer({
        id: "waterBank",
        source: "WaterBank",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
        layout: {
          visibility: "none",
        },
      });

      //* Add navigation control (the +/- zoom buttons)
      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

      //* Locate User
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
            maximumAge: 5000,
          },
          trackUserLocation: true,
          showUserHeading: true,
        }),
        "bottom-right"
      );

      //* Show Hide Layer
      function showLayer(zone) {
        var layer = ["layout", "park", "waterBank"];
        if (zone == "park") {
          var layerID = "park";
          layer.splice(1, 1);
        } else if (zone == "waterBank") {
          var layerID = "waterBank";
          layer.splice(2, 1);
        } else {
          var layerID = "layout";
          layer.splice(0, 1);
        }
        map.setLayoutProperty(layerID, "visibility", "visible");
        map.setLayoutProperty(layer[0], "visibility", "none");
        map.setLayoutProperty(layer[1], "visibility", "none");
      }

      //* Fly to function
      buttonOption.map((info) => {
        var buttonFly = document.getElementById(info.value);
        buttonFly.addEventListener("click", function () {
          showLayer(info.value);
          map.flyTo(zone[info.value]);
        });
      });
    });

    let count = 0;
    const interval = setInterval(() => {
      if (count > 6) {
        count = 0;
      }
      if (!hover) {
        document.getElementById(nameZone[count]).click();
        count += 1;
      }
    }, 6000);

    map.on("style.load", function () {
      //* Add tree popup
      map.on("click", function (e) {
        setCoLngLat({
          ...coLngLat,
          lng: e.lngLat.lng.toFixed(6),
          lat: e.lngLat.lat.toFixed(6),
        });

        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setDOMContent(popupRef.current)
          .addTo(map);
      });

      //* add markers to map
      let i = 0;
      for (const feature of geojson?.features) {
        const el = document.createElement("div");

        let coordinates = feature.geometry.coordinates;
        const description = feature.properties.description;
        const code = feature.properties.code;
        const treeType = feature.properties.treeType;

        if (treeType == 1) {
          el.className = "marker type-1";
        } else if (treeType == 2) {
          el.className = "marker type-2";
        } else if (treeType == 3) {
          el.className = "marker type-3";
        } else if (treeType == 4) {
          el.className = "marker type-4";
        } else {
          el.className = "marker type-5";
        }

        if (!coordinates[1] || !coordinates[0]) {
          coordinates = [101.085138 - i * 0.00001, 12.884769];
          i++;
        }

        el.addEventListener("mouseenter", () => {
          popup
            .setLngLat(coordinates)
            .setHTML(code + " " + description + " " + "Type:" + treeType)
            .addTo(map);
        });
        el.addEventListener("mouseleave", () => popup.remove());

        new mapboxgl.Marker(el)
          .setLngLat(coordinates)
          .setPopup(popup)
          .addTo(map);
      }
    });

    return () => {
      map.remove();
      clearInterval(interval);
    };
  }, [geojson]);

  useEffect(() => {
    const initPage = setTimeout(() => handleData(), 0);

    return () => {
      clearTimeout(initPage);
    };
  }, [mapInfo, selectInfo]);

  return (
    <>
      {/* Button Zone Select */}
      <Box m={1} className="sidebarStyle">
        {buttonOption.map((info) => (
          <Button
            id={info.value}
            key={info.value}
            value={info.value}
            rounded="full"
            size="xs"
            my={1}
            shadow="md"
            colorScheme="whiteAlpha"
            color="black"
          >
            {info.text}
          </Button>
        ))}
      </Box>

      <Box
        ref={mapContainer}
        className="map-container"
        roundedBottom="2xl"
        h="56vh"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />

      {/* Popup */}
      <div style={{ display: "none" }}>
        <Box ref={popupRef} textAlign="center">
          {/* <Text fontWeight="bold" fontSize="sm">
            Do you want to add tree here?
          </Text> */}
          <Text>
            GPS location: {coLngLat.lng},{coLngLat.lat}
          </Text>
          {/* <Button
            colorScheme="whatsapp"
            size="xs"
            rounded="full"
            mt={3}
            onClick={() =>
              navigate("/register", {
                state: { lng: coLngLat.lng, lat: coLngLat.lat },
              })
            }
          >
            Add Tree
          </Button> */}
        </Box>
      </div>
    </>
  );
}

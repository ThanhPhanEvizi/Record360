import React, { ChangeEvent, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { stringify } from "querystring";
import { Redirect, useHistory } from "react-router-dom";
import { Col, Row } from "../elements";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Navigation from "./Navigation";

interface Props {
  children: React.ReactNode;
}

const headerHeight = "45px";
const sidebarCollapsedWidth = "80px";
const sidebarExpandedWidth = "200px";

const PrivateLayout = ({ children }: Props) => {
  return (
    <Row height="100%">
      <Col></Col>
      <Col>
        <Row
          py={3}
          right={0}
          align="center"
          px="10px"
          height={headerHeight}
          zIndex={1}
          sx={{ transition: "all 0.4s linear" }}
        >
          <Col flex={1} align="center">
            <Typography>Menu Private</Typography>
          </Col>
        </Row>
        <Navigation />
        <Box pt={2} mx={2}>
          {children}
        </Box>
      </Col>
    </Row>
  );
};

export default memo(PrivateLayout);

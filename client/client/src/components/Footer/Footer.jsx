import { Layout } from "antd";
import React from "react";

const { Footer: FooterAntd } = Layout;
const Footer = () => {
  return (
    <FooterAntd style={{ borderTop: "1px solid #000" }}>
      <div className="footer__inner">
        <div>© 2020</div>
        <div>
          <b>Дизайн</b> - Malyavin
        </div>
      </div>
    </FooterAntd>
  );
};

export default Footer;

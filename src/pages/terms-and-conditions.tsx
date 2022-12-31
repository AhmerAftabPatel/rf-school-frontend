import Footer from '@/components/footer';
import styled from 'styled-components'
const TermsAndConditions = () => {

    const Headerstyle = styled.div`
   {
    padding: 20px 50px;

    @media only screen and (max-width: 600px) {
      padding: 0px;
    }
  }
`;
  return (
    <>
    <Headerstyle>
      <h1 className="content-head">Terms &amp; Conditions</h1>
      <div className="content-seprater">&nbsp;</div>
      <p className="updated-date">Last updated on Dec 26th 2022</p>
      <p className="content-text">
        The Website Owner, including subsidiaries and affiliates (&ldquo;Website&rdquo; or &ldquo;Website Owner&rdquo;
        or &ldquo;we&rdquo; or &ldquo;us&rdquo; or &ldquo;our&rdquo;) provides the information contained on the website
        or any of the pages comprising the website (&ldquo;website&rdquo;) to visitors (&ldquo;visitors&rdquo;)
        (cumulatively referred to as &ldquo;you&rdquo; or &ldquo;your&rdquo; hereinafter) subject to the terms and
        conditions set out in these website terms and conditions, the privacy policy and any other relevant terms and
        conditions, policies and notices which may be applicable to a specific section or module of the website.
      </p>
      <p className="content-text">
        Welcome to our website. If you continue to browse and use this website you are agreeing to comply with and be
        bound by the following terms and conditions of use, which together with our privacy policy govern RAHBAR
        EDUCATIONAL AND WELFARE SOCIETY''s relationship with you in relation to this website.
      </p>
      <p className="content-text">
        The term 'RAHBAR EDUCATIONAL AND WELFARE SOCIETY' or 'us' or 'we' refers to the owner of the website whose
        registered/operational office is Hamali Colony, Zaheerabad, Dist : Sanga Reddy, TS Medak TELANGANA 502220. The
        term 'you' refers to the user or viewer of our website.
      </p>
      <p className="content-text">
        <strong>The use of this website is subject to the following terms of use:</strong>
      </p>
      <ul className="unorder-list">
        <li className="list-item">
          <p className="content-text list-text">
            The content of the pages of this website is for your general information and use only. It is subject to
            change without notice.
          </p>
        </li>
        <li className="list-item">
          <p className="content-text list-text">
            Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness,
            performance, completeness or suitability of the information and materials found or offered on this website
            for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or
            errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent
            permitted by law.
          </p>
        </li>
        <li className="list-item">
          <p className="content-text list-text">
            Your use of any information or materials on this website is entirely at your own risk, for which we shall
            not be liable. It shall be your own responsibility to ensure that any products, services or information
            available through this website meet your specific requirements.
          </p>
        </li>
        <li className="list-item">
          <p className="content-text list-text">
            This website contains material which is owned by or licensed to us. This material includes, but is not
            limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in
            accordance with the copyright notice, which forms part of these terms and conditions.
          </p>
        </li>
        <li className="list-item">
          <p className="content-text list-text">
            All trademarks reproduced in this website which are not the property of, or licensed to, the operator are
            acknowledged on the website.
          </p>
        </li>
        <li className="list-item">
          <p className="content-text list-text">
            Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
          </p>
        </li>
        <li className="list-item">
          <p className="content-text list-text">
            From time to time this website may also include links to other websites. These links are provided for your
            convenience to provide further information.
          </p>
        </li>
        <li className="list-item">
          <p className="content-text list-text">
            You may not create a link to this website from another website or document without RAHBAR EDUCATIONAL AND
            WELFARE SOCIETY&rsquo;s prior written consent.
          </p>
        </li>
        <li className="list-item">
          <p className="content-text list-text">
            Your use of this website and any dispute arising out of such use of the website is subject to the laws of
            India or other regulatory authority.
          </p>
        </li>
      </ul>
      <p className="content-text">
        We as a merchant shall be under no liability whatsoever in respect of any loss or damage arising directly or
        indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded
        the preset limit mutually agreed by us with our acquiring bank from time to time
      </p>
      <div className="MuiBox-root css-13jhtv7">
        <div className="MuiBox-root css-116jkh4">
          <div className="MuiBox-root css-1op884h">
            <div className="MuiBox-root css-1np4zs2">
              <div className="MuiBox-root css-0">
                <div className="compalinace-page">
                  <div className="compalinace-content">
                    <div className="content-container">
                      <h1 className="content-head">Cancellation &amp; Refund Policy</h1>
                      <div className="content-seprater">&nbsp;</div>
                      <p className="updated-date">Last updated on Dec 26th 2022</p>
                      <p className="content-text">No cancellations &amp; Refunds are entertained</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="content-head">Shipping &amp; Delivery Policy</h1>
      <div className="content-seprater">&nbsp;</div>
      <p className="updated-date">Last updated on Dec 26th 2022</p>
      <p className="content-text">Shipping is not applicable for business.</p>
    </Headerstyle>
    <Footer />
    </>
  );
};

export default TermsAndConditions;

const shopbag = ({ className }) => {
  return (
    // <svg
    //   stroke="currentColor"
    //   fill="currentColor"
    //   strokeWidth="0"
    //   viewBox="0 0 512 512"
    //   height="1em"
    //   width="1em"
    //   xmlns="http://www.w3.org/2000/svg"
    //   className={className}
    // >
    //   <path d="M443.5 420.2L336.7 312.4c20.9-26.2 33.5-59.4 33.5-95.5 0-84.5-68.5-153-153.1-153S64 132.5 64 217s68.5 153 153.1 153c36.6 0 70.1-12.8 96.5-34.2l106.1 107.1c3.2 3.4 7.6 5.1 11.9 5.1 4.1 0 8.2-1.5 11.3-4.5 6.6-6.3 6.8-16.7.6-23.3zm-226.4-83.1c-32.1 0-62.3-12.5-85-35.2-22.7-22.7-35.2-52.9-35.2-84.9 0-32.1 12.5-62.3 35.2-84.9 22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2c22.7 22.7 35.2 52.9 35.2 84.9 0 32.1-12.5 62.3-35.2 84.9-22.7 22.7-52.9 35.2-85 35.2z" />
    // </svg>
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      className='nnav'
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1" fill="white">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.5257 1.94654H8.76105C9.99561 1.94654 10.9964 2.94734 10.9964 4.1819V6.41691H4.29034V4.1819C4.29034 2.94734 5.29114 1.94654 6.5257 1.94654ZM3.17266 6.41691V4.1819C3.17266 2.33006 4.67386 0.828857 6.5257 0.828857H8.76105C10.6129 0.828857 12.1141 2.33006 12.1141 4.1819V6.41691H12.3556C13.5229 6.41691 14.4937 7.31512 14.5842 8.47893L15.2797 17.4204C15.3807 18.7193 14.3539 19.8291 13.0511 19.8291H2.23549C0.932622 19.8291 -0.0941632 18.7193 0.00686619 17.4204L0.702311 8.47893C0.79283 7.31512 1.76361 6.41691 2.93094 6.41691H3.17266ZM3.17266 7.53459H2.93094C2.34727 7.53459 1.86188 7.98369 1.81662 8.5656L1.12118 17.507C1.07067 18.1565 1.58406 18.7114 2.23549 18.7114H13.0511C13.7025 18.7114 14.2159 18.1565 14.1654 17.507L13.4699 8.5656C13.4247 7.9837 12.9393 7.53459 12.3556 7.53459H12.1141V7.53493H3.17266V7.53459Z"
        />
      </mask>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.5257 1.94654H8.76105C9.99561 1.94654 10.9964 2.94734 10.9964 4.1819V6.41691H4.29034V4.1819C4.29034 2.94734 5.29114 1.94654 6.5257 1.94654ZM3.17266 6.41691V4.1819C3.17266 2.33006 4.67386 0.828857 6.5257 0.828857H8.76105C10.6129 0.828857 12.1141 2.33006 12.1141 4.1819V6.41691H12.3556C13.5229 6.41691 14.4937 7.31512 14.5842 8.47893L15.2797 17.4204C15.3807 18.7193 14.3539 19.8291 13.0511 19.8291H2.23549C0.932622 19.8291 -0.0941632 18.7193 0.00686619 17.4204L0.702311 8.47893C0.79283 7.31512 1.76361 6.41691 2.93094 6.41691H3.17266ZM3.17266 7.53459H2.93094C2.34727 7.53459 1.86188 7.98369 1.81662 8.5656L1.12118 17.507C1.07067 18.1565 1.58406 18.7114 2.23549 18.7114H13.0511C13.7025 18.7114 14.2159 18.1565 14.1654 17.507L13.4699 8.5656C13.4247 7.9837 12.9393 7.53459 12.3556 7.53459H12.1141V7.53493H3.17266V7.53459Z"
        fill="#253B80"
      />
      <path
        d="M10.9964 6.41691V7.41691H11.9964V6.41691H10.9964ZM4.29034 6.41691H3.29034V7.41691H4.29034V6.41691ZM3.17266 6.41691V7.41691H4.17266V6.41691H3.17266ZM12.1141 6.41691H11.1141V7.41691H12.1141V6.41691ZM14.5842 8.47893L15.5812 8.40139V8.40139L14.5842 8.47893ZM15.2797 17.4204L14.2827 17.4979L15.2797 17.4204ZM0.00686619 17.4204L-0.990123 17.3428L0.00686619 17.4204ZM0.702311 8.47893L1.6993 8.55647L0.702311 8.47893ZM3.17266 7.53459H4.17266V6.53459H3.17266V7.53459ZM1.81662 8.5656L0.819636 8.48805L1.81662 8.5656ZM1.12118 17.507L0.124191 17.4295H0.124191L1.12118 17.507ZM14.1654 17.507L13.1684 17.5846V17.5846L14.1654 17.507ZM13.4699 8.5656L14.4669 8.48806V8.48806L13.4699 8.5656ZM12.1141 7.53459V6.53459H11.1141V7.53459H12.1141ZM12.1141 7.53493V8.53493H13.1141V7.53493H12.1141ZM3.17266 7.53493H2.17266V8.53493H3.17266V7.53493ZM8.76105 0.946537H6.5257V2.94654H8.76105V0.946537ZM11.9964 4.1819C11.9964 2.39506 10.5479 0.946537 8.76105 0.946537V2.94654C9.44333 2.94654 9.99641 3.49963 9.99641 4.1819H11.9964ZM11.9964 6.41691V4.1819H9.99641V6.41691H11.9964ZM10.9964 5.41691H4.29034V7.41691H10.9964V5.41691ZM3.29034 4.1819V6.41691H5.29034V4.1819H3.29034ZM6.5257 0.946537C4.73886 0.946537 3.29034 2.39506 3.29034 4.1819H5.29034C5.29034 3.49963 5.84343 2.94654 6.5257 2.94654V0.946537ZM2.17266 4.1819V6.41691H4.17266V4.1819H2.17266ZM6.5257 -0.171143C4.12158 -0.171143 2.17266 1.77778 2.17266 4.1819H4.17266C4.17266 2.88235 5.22615 1.82886 6.5257 1.82886V-0.171143ZM8.76105 -0.171143H6.5257V1.82886H8.76105V-0.171143ZM13.1141 4.1819C13.1141 1.77778 11.1652 -0.171143 8.76105 -0.171143V1.82886C10.0606 1.82886 11.1141 2.88235 11.1141 4.1819H13.1141ZM13.1141 6.41691V4.1819H11.1141V6.41691H13.1141ZM12.3556 5.41691H12.1141V7.41691H12.3556V5.41691ZM15.5812 8.40139C15.4502 6.71694 14.0451 5.41691 12.3556 5.41691V7.41691C13.0007 7.41691 13.5372 7.9133 13.5873 8.55648L15.5812 8.40139ZM16.2767 17.3428L15.5812 8.40139L13.5873 8.55647L14.2827 17.4979L16.2767 17.3428ZM13.0511 20.8291C14.9368 20.8291 16.4229 19.2229 16.2767 17.3428L14.2827 17.4979C14.3385 18.2158 13.7711 18.8291 13.0511 18.8291V20.8291ZM2.23549 20.8291H13.0511V18.8291H2.23549V20.8291ZM-0.990123 17.3428C-1.13635 19.2229 0.349775 20.8291 2.23549 20.8291V18.8291C1.51547 18.8291 0.948022 18.2158 1.00386 17.4979L-0.990123 17.3428ZM-0.294678 8.40139L-0.990123 17.3428L1.00386 17.4979L1.6993 8.55647L-0.294678 8.40139ZM2.93094 5.41691C1.2414 5.41691 -0.163665 6.71694 -0.294678 8.40139L1.6993 8.55647C1.74932 7.9133 2.28582 7.41691 2.93094 7.41691V5.41691ZM3.17266 5.41691H2.93094V7.41691H3.17266V5.41691ZM3.17266 6.53459H2.93094V8.53459H3.17266V6.53459ZM2.93094 6.53459C1.82506 6.53459 0.905389 7.38551 0.819636 8.48805L2.81361 8.64314C2.81838 8.58187 2.86948 8.53459 2.93094 8.53459V6.53459ZM0.819636 8.48805L0.124191 17.4295L2.11817 17.5846L2.81361 8.64314L0.819636 8.48805ZM0.124191 17.4295C0.0284803 18.6601 1.00121 19.7114 2.23549 19.7114V17.7114C2.1669 17.7114 2.11285 17.653 2.11817 17.5846L0.124191 17.4295ZM2.23549 19.7114H13.0511V17.7114H2.23549V19.7114ZM13.0511 19.7114C14.2853 19.7114 15.2581 18.6601 15.1624 17.4295L13.1684 17.5846C13.1737 17.653 13.1197 17.7114 13.0511 17.7114V19.7114ZM15.1624 17.4295L14.4669 8.48806L12.4729 8.64314L13.1684 17.5846L15.1624 17.4295ZM14.4669 8.48806C14.3812 7.38551 13.4615 6.53459 12.3556 6.53459V8.53459C12.4171 8.53459 12.4682 8.58188 12.4729 8.64314L14.4669 8.48806ZM12.3556 6.53459H12.1141V8.53459H12.3556V6.53459ZM13.1141 7.53493V7.53459H11.1141V7.53493H13.1141ZM3.17266 8.53493H12.1141V6.53493H3.17266V8.53493ZM2.17266 7.53459V7.53493H4.17266V7.53459H2.17266Z"
        fill="#253B80"
        mask="url(#path-1-inside-1)"
      />
    </svg>
  );
};

export default shopbag;

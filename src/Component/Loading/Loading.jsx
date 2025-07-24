import "../../Component/Loading/Loading.modules.css"; 

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-10">
      {/* SVG Cart Loader */}
      <svg
        className="block mx-auto mb-6 w-32 h-32 text-primary-600"
        role="img"
        aria-label="Shopping cart line animation"
        viewBox="0 0 128 128"
        width="128"
        height="128"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
        >
          {/* Track */}
          <g className="cart__track" stroke="currentColor" opacity="0.1">
            <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
            <circle cx="43" cy="111" r="13" />
            <circle cx="102" cy="111" r="13" />
          </g>
          {/* Animated Lines */}
          <g className="cart__lines" stroke="currentColor">
            <polyline
              className="cart__top animate-cart-top"
              points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
              strokeDasharray="338 338"
              strokeDashoffset="0"
            />
            <g className="cart__wheel1 animate-cart-wheel1" style={{ transformOrigin: "43px 111px" }}>
              <circle
                className="cart__wheel-stroke animate-cart-wheel-stroke"
                cx="43"
                cy="111"
                r="13"
                strokeDasharray="81.68 81.68"
                strokeDashoffset="0"
              />
            </g>
            <g className="cart__wheel2 animate-cart-wheel2" style={{ transformOrigin: "102px 111px" }}>
              <circle
                className="cart__wheel-stroke animate-cart-wheel-stroke"
                cx="102"
                cy="111"
                r="13"
                strokeDasharray="81.68 81.68"
                strokeDashoffset="0"
              />
            </g>
          </g>
        </g>
      </svg>
      {/* Loading Text */}
      <div className="relative h-6 w-64 text-center">
        <p className="absolute w-full text-primary-600 font-semibold animate-fade-msg">
          Bringing you the goods…
        </p>
        <p className="absolute w-full text-gray-400 font-semibold animate-fade-msg-delay">
          This is taking long. Something’s wrong.
        </p>
      </div>
    </div>
  );
}

export default Loading;
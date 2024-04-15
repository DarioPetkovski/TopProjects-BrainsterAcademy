import "./banner.css";
interface BannerProps {
  title: string;
  image: string;
}
export const Banner = ({ title, image }: BannerProps) => {
  return (
    <div className="row position-relative my-5">
      <img
        className="position-absolute h-100"
        src={require(`../../../assets/images/${image}.png`)}
        alt=""
      />
      <div className="banner-position w-50 text-white py-5 mx-auto">
        <h2 className="display-5 small">{title}</h2>
        <p>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation
        </p>
        <div className=" position-relative form-outline w-75  py-2">
          <div className="position-absolute end-0">
            <div className="mt-1 m-5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.85726 8.57143C2.85726 7.05591 3.4593 5.60245 4.53094 4.53082C5.60257 3.45918 7.05602 2.85714 8.57155 2.85714C10.0871 2.85714 11.5405 3.45918 12.6122 4.53082C13.6838 5.60245 14.2858 7.05591 14.2858 8.57143C14.2858 10.087 13.6838 11.5404 12.6122 12.612C11.5405 13.6837 10.0871 14.2857 8.57155 14.2857C7.05602 14.2857 5.60257 13.6837 4.53094 12.612C3.4593 11.5404 2.85726 10.087 2.85726 8.57143ZM8.57155 1.62088e-07C7.22255 -0.000171985 5.89256 0.318061 4.68975 0.928816C3.48693 1.53957 2.44526 2.4256 1.64944 3.51485C0.853623 4.6041 0.326136 5.8658 0.10988 7.19735C-0.106376 8.5289 -0.00529441 9.89269 0.404904 11.1778C0.815103 12.4629 1.52284 13.6331 2.47054 14.5931C3.41825 15.5531 4.57917 16.2759 5.85888 16.7026C7.13859 17.1294 8.50096 17.2481 9.83519 17.049C11.1694 16.85 12.4378 16.3388 13.5373 15.5571L17.5615 19.5814C17.831 19.8417 18.1918 19.9856 18.5664 19.9824C18.941 19.9791 19.2993 19.8289 19.5641 19.564C19.829 19.2992 19.9793 18.9409 19.9825 18.5663C19.9858 18.1917 19.8418 17.8309 19.5815 17.5614L15.5587 13.5386C16.4705 12.2562 17.0118 10.7476 17.1231 9.17811C17.2345 7.60858 16.9117 6.03867 16.1901 4.64043C15.4685 3.24218 14.3759 2.06955 13.032 1.25103C11.6882 0.432515 10.145 -0.000305787 8.57155 1.62088e-07Z"
                  fill="#9A9A9A"
                />
              </svg>
            </div>
          </div>

          <input
            type="text"
            className="form-control ps-5 rounded-5"
            placeholder="Пребарај"
          />
        </div>
      </div>
    </div>
  );
};

import AsyncImg from "../../components/AsyncImg/AsyncImg";

export default function HomeSkeleton() {
  return (
    <section className="home-container">
      <div className="home-left">
        <div className="main-headline">
          <AsyncImg src="" proportions={2} />

          {/* <h1 className="grey-100 headline-h1"></h1> */}
        </div>
        <div className="space-ver-m"></div>
        <div className="other-news-left">
          <div>
            <div className="card-one skeleton-card-one">
              <div className="card-one-left skeleton-c1-left">
                <div className="tags-card-one">
                  <p className="news-tag skeleton home-skeleton-cat skeleton-inline"></p>
                </div>
                <div className="space-ver-xs"></div>
                <div className="bottom-card-one">
                  <h2 className="skeleton home-skeleton-title height-2"></h2>
                  <div className="space-ver-xxs"></div>
                  <p className="skeleton home-skeleton-subt skeleton-inline"></p>
                </div>
              </div>
              <div className="card-one-right">
                <AsyncImg src="" />
              </div>
            </div>
            <>
              <div className="space-ver-s"></div>
              {/* <div className="line-hor"></div> */}
              <div className="space-ver-s"></div>
            </>
          </div>
        </div>
      </div>
      <div className="home-right">
        <AsyncImg src="" />
        <div className="space-ver-xs"></div>
        <div>
          <div className="card-two">
            <h2 className="skeleton height-2"></h2>
            <p className="skeleton skeleton-inline"></p>
          </div>
          <>
            <div className="space-ver-m"></div>
            {/* <div className="line-hor"></div> */}
            <div className="space-ver-m"></div>
          </>
          <div className="card-two">
            <h2 className="skeleton height-2"></h2>
            <p className="skeleton skeleton-inline"></p>
          </div>
          <>
            <div className="space-ver-m"></div>
            {/* <div className="line-hor"></div> */}
            <div className="space-ver-m"></div>
          </>
          <div className="card-two">
            <h2 className="skeleton height-2"></h2>
            <p className="skeleton skeleton-inline"></p>
          </div>
          <>
            <div className="space-ver-m"></div>
            {/* <div className="line-hor"></div> */}
            <div className="space-ver-m"></div>
          </>
        </div>
      </div>
    </section>
  );
}

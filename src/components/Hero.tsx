import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden ">
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <div className="inline-flex space-x-6">
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold leading-6 text-green-400 ring-1 ring-inset ring-indigo-500/20">
                Lorem ipsum dolor sit amet
              </span>
              <Link href="#" className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                <span>Learn more</span>
                <i className="fas fa-chevron-right text-gray-500"></i>
              </Link>
            </div>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Lorem ipsum dolor sit amet
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam accusantium inventore iusto eos neque. Aperiam eum blanditiis assumenda tempora non reiciendis, doloremque, ipsa cum error possimus voluptate. Sint, corporis molestiae?
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/swap"
              className="rounded-md bg-green-500 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              Get started
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  )
}

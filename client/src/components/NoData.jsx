 import noDataImage  from '../assets/nothing_here_yet.webp'

const NoData = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <img src={noDataImage} alt="No Data" className='w-64 object-contain' />
      <p>No data is Available</p>
    </div>
  )
}

export default NoData

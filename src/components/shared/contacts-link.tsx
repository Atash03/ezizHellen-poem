import DownloadLink from './download-link';

type Props = {
  title: string;
  subtitle: string;
  link: string;
  btnText: string;
};

const ContactsLink = ({ link, subtitle, title, btnText }: Props) => {
  return (
    <div className="flex flex-col gap-2 group">
      <h4 className="text-20 group-hover:text-PRIM transition-colors">{title}</h4>
      <h5 className="text-16 !font-normal">{subtitle}</h5>
      <DownloadLink link={link} text={btnText} />
    </div>
  );
};

export default ContactsLink;

import { Card, Heading, IconButton, Text } from '@radix-ui/themes';
import { HomeIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center gap-4">
      <IconButton className="absolute right-4 top-4" asChild>
        <Link href="/">
          <HomeIcon height="15" width="15" />
        </Link>
      </IconButton>
      <Card className="flex w-full flex-col justify-center gap-4">
        <Heading>Privacy Policy for Snitt</Heading>

        <Text>
          At Snitt, accessible from snitt.zaim.no, one of our main priorities is the privacy of our visitors. This
          Privacy Policy document contains types of information that is collected and recorded by Snitt and how we use
          it.
        </Text>

        <Text>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to
          contact us. Our Privacy Policy was generated with the help of{' '}
          <a href="https://www.gdprprivacynotice.com/">GDPR Privacy Policy Generator</a>
        </Text>

        <Heading>General Data Protection Regulation (GDPR)</Heading>
        <Text>We are a Data Controller of your information.</Text>

        <Text>
          Snitt legal basis for collecting and using the personal information described in this Privacy Policy depends
          on the Personal Information we collect and the specific context in which we collect the information:
        </Text>
        <ul>
          <li>Snitt needs to perform a contract with you</li>
          <li>You have given Snitt permission to do so</li>
          <li>Processing your personal information is in Snitt legitimate interests</li>
          <li>Snitt needs to comply with the law</li>
        </ul>

        <Text>
          Snitt will retain your personal information only for as long as is necessary for the purposes set out in this
          Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal
          obligations, resolve disputes, and enforce our policies.
        </Text>

        <Text>
          If you are a resident of the European Economic Area (EEA), you have certain data protection rights. If you
          wish to be informed what Personal Information we hold about you and if you want it to be removed from our
          systems, please contact us.
        </Text>
        <Text>In certain circumstances, you have the following data protection rights:</Text>
        <ul>
          <li>The right to access, update or to delete the information we have on you.</li>
          <li>The right of rectification.</li>
          <li>The right to object.</li>
          <li>The right of restriction.</li>
          <li>The right to data portability</li>
          <li>The right to withdraw consent</li>
        </ul>

        <Heading>Log Files</Heading>

        <Text>
          Snitt follows a standard procedure of using log files. These files log visitors when they visit websites. All
          hosting companies do this and a part of hosting services analytics. The information collected by log files
          include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp,
          referring/exit pages, and possibly the number of clicks. These are not linked to any information that is
          personally identifiable. The purpose of the information is for analyzing trends, administering the site,
          tracking users movement on the website, and gathering demographic information.
        </Text>

        <h2>Cookies and Web Beacons</h2>

        <Text>
          Like any other website, Snitt uses cookies. These cookies are used to store information including visitors
          preferences, and the pages on the website that the visitor accessed or visited. The information is used to
          optimize the users experience by customizing our web page content based on visitors browser type and/or other
          information.
        </Text>

        <h2>Privacy Policies</h2>

        <Text>You may consult this list to find the Privacy Policy for each of the advertising partners of Snitt.</Text>

        <Text>
          Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used
          in their respective advertisements and links that appear on Snitt, which are sent directly to users browser.
          They automatically receive your IP address when this occurs. These technologies are used to measure the
          effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on
          websites that you visit.
        </Text>

        <Text>
          Note that Snitt has no access to or control over these cookies that are used by third-party advertisers.
        </Text>

        <Heading>Third Party Privacy Policies</Heading>

        <Text>
          Snitts Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult
          the respective Privacy Policies of these third-party ad servers for more detailed information. It may include
          their practices and instructions about how to opt-out of certain options.{' '}
        </Text>

        <Text>
          You can choose to disable cookies through your individual browser options. To know more detailed information
          about cookie management with specific web browsers, it can be found at the browsers respective websites.
        </Text>

        <Heading>Childrens Information</Heading>

        <Text>
          Another part of our priority is adding protection for children while using the internet. We encourage parents
          and guardians to observe, participate in, and/or monitor and guide their online activity.
        </Text>

        <Text>
          Snitt does not knowingly collect any Personal Identifiable Information from children under the age of 13. If
          you think that your child provided this kind of information on our website, we strongly encourage you to
          contact us immediately and we will do our best efforts to promptly remove such information from our records.
        </Text>

        <Heading>Online Privacy Policy Only</Heading>

        <Text>
          Our Privacy Policy applies only to our online activities and is valid for visitors to our website with regards
          to the information that they shared and/or collect in Snitt. This policy is not applicable to any information
          collected offline or via channels other than this website.
        </Text>

        <Heading>Consent</Heading>

        <Text>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</Text>
      </Card>
    </main>
  );
}
